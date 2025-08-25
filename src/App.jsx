import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from '@/ProtectedRoute/ProtectedRoute';
import Home from '@/Pages/Home.jsx';
import Signup from '@/Pages/Siginup.jsx';
import Login from '@/Pages/Login.jsx';


function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1400);
    }, [pathname]);
    return null;
}

function App() {
    const location = useLocation();
    return (
        <>
            <ScrollToTop />
            <Toaster />
            <Routes location={location} key={location.pathname}>
                <Route path="/user/signup" element={<Signup />} />
                <Route path="/user/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes >
        </>
    )
}

export default App
