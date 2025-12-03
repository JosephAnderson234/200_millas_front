import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import logoIcon from "@assets/logo.png";
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-primary text-white fixed w-full z-50 transition-all duration-300 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wider text-white flex items-center">
                    <img src={logoIcon} alt="200 Millas Logo" className="h-8 w-8 mr-2" />
                    200 MILLAS
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 uppercase text-sm tracking-widest">
                    <Link to="/" className="hover:text-gray-300 transition-colors">Inicio</Link>
                    <Link to="/menu" className="hover:text-gray-300 transition-colors">Carta</Link>
                    <a href="/#locales" className="hover:text-gray-300 transition-colors">Locales</a>

                    <div className="flex items-center space-x-4 ml-4 border-l border-white/20 pl-8">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm normal-case font-medium">Hola, {user?.nombre}</span>
                                <Link to="/my-orders" className="hover:text-gray-300 transition-colors">Mis Pedidos</Link>
                                <Link to="/profile" className="hover:text-gray-300 transition-colors">Mi Perfil</Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 border border-white text-white hover:bg-white hover:text-primary transition-all rounded-sm"
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-white text-primary hover:bg-gray-100 transition-all rounded-sm font-bold"
                                >
                                    Registro
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-primary absolute w-full border-t border-white/10 shadow-lg"
                    >
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                }
                            }}
                            className="flex flex-col items-center py-8 space-y-6 uppercase text-sm tracking-widest"
                        >
                            <motion.div
                                variants={{
                                    open: { opacity: 1, y: 0 },
                                    closed: { opacity: 0, y: -10 }
                                }}
                            >
                                <Link to="/" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                            </motion.div>
                            <motion.div
                                variants={{
                                    open: { opacity: 1, y: 0 },
                                    closed: { opacity: 0, y: -10 }
                                }}
                            >
                                <Link to="/menu" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Carta</Link>
                            </motion.div>
                            <motion.div
                                variants={{
                                    open: { opacity: 1, y: 0 },
                                    closed: { opacity: 0, y: -10 }
                                }}
                            >
                                <a href="/#locales" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Locales</a>
                            </motion.div>
                            <motion.hr
                                variants={{
                                    open: { opacity: 1, scaleX: 1 },
                                    closed: { opacity: 0, scaleX: 0 }
                                }}
                                className="w-12 border-white/20"
                            />

                            {isAuthenticated ? (
                                <>
                                    <motion.span
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -10 }
                                        }}
                                        className="text-lg normal-case font-bold"
                                    >
                                        Hola, {user?.nombre}
                                    </motion.span>
                                    <motion.div
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -10 }
                                        }}
                                    >
                                        <Link to="/my-orders" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Mis Pedidos</Link>
                                    </motion.div>
                                    <motion.div
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -10 }
                                        }}
                                    >
                                        <Link to="/profile" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Mi Perfil</Link>
                                    </motion.div>
                                    <motion.button
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -10 }
                                        }}
                                        onClick={handleLogout}
                                        className="hover:text-gray-300 text-lg"
                                    >
                                        Cerrar Sesión
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -10 }
                                        }}
                                    >
                                        <Link to="/login" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                    </motion.div>
                                    <motion.div
                                        variants={{
                                            open: { opacity: 1, y: 0 },
                                            closed: { opacity: 0, y: -10 }
                                        }}
                                    >
                                        <Link to="/register" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Registro</Link>
                                    </motion.div>
                                </>
                            )}
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;