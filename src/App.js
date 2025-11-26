// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import Navigation from "./modules/Navigation/Navigation";
import Home from "./pages/Home/Home";
import TechnologyList from "./pages/TechnologyList/TechnologyList";
import AddTechnology from "./pages/AddTechnology/AddTechnology";
import TechnologyDetail from "./modules/TechnologyDetail/TechnologyDetail";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";

function App() {
    const {
        technologies,
        loading,
        error,
        addTechnology,
        updateTechnology,
        updateTechnologyState,
        importRoadmap,
        getAvailableRoadmaps,
        clearError,
        setTechnologies
    } = useTechnologiesApi();

    const handleImportData = (importedTechnologies) => {
        setTechnologies(importedTechnologies);
    };

    return (
        <Router>
            <div className="App">
                <Navigation />
                <main className="main-content">
                    {/* Сообщения об ошибках */}
                    {error && (
                        <div className="error-banner">
                            <span>❌ {error}</span>
                            <button onClick={clearError} className="close-error">×</button>
                        </div>
                    )}

                    <Routes>
                        <Route path="/" element={
                            <Home
                                technologies={technologies}
                                onStateChange={updateTechnologyState}
                            />
                        } />
                        <Route path="/technologies" element={
                            <TechnologyList
                                technologies={technologies}
                                onStateChange={updateTechnologyState}
                            />
                        } />
                        <Route path="/technology/:id" element={
                            <TechnologyDetail
                                technologies={technologies}
                                onUpdateTechnology={updateTechnology}
                            />
                        } />
                        <Route
                            path="/add-technology"
                            element={<AddTechnology onAddTechnology={addTechnology} />}
                        />
                        <Route path="/dashboard" element={<Dashboard technologies={technologies} />} />
                        <Route path="/settings" element={
                            <Settings
                                technologies={technologies}
                                onImportData={handleImportData}
                                onImportRoadmap={importRoadmap}
                                loading={loading}
                                availableRoadmaps={getAvailableRoadmaps()}
                            />
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;