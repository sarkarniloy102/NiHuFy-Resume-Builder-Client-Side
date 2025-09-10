import { useContext, useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import { LayoutTemplate, Menu, X } from 'lucide-react';
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Cards";

const LandingPage = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div className={landingPageStyles.container}>
            {/* header */}
            <header className={landingPageStyles.header}>
                {/*  */}
                <div className={landingPageStyles.headerContainer}>
                    <div className={landingPageStyles.logoContainer}>
                        <div className={landingPageStyles.logoIcon}>
                            <LayoutTemplate className={landingPageStyles.logoIconInner} />
                        </div>
                        <span className={landingPageStyles.logoText}>
                            NiHuFy
                        </span>

                    </div>
                    {/* mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={landingPageStyles.mobileMenuButton}>
                        {
                            mobileMenuOpen ?
                                <X size={34} className={landingPageStyles.mobileMenuButton} /> :
                                <Menu size={34} className={landingPageStyles.mobileMenuButton} />
                        }
                    </button>
                    {/* desktop navigation */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <ProfileInfoCard />
                        ) : (
                            <button className={landingPageStyles.desktopAuthButton}
                                onClick={() => setOpenAuthModel(true)}>
                                <div className={landingPageStyles.desktopAuthButtonOverlay}> </div>
                                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                            </button>
                        )

                        }
                    </div>
                </div>
                {/* mobile menu */}
                {
                    mobileMenuOpen && (
                        <div className={landingPageStyles.mobileMenu}>
                            <div className={landingPageStyles.mobileMenuContainer}>
                                {
                                    user ? (
                                        <div className={landingPageStyles.mobileUserInfo}>
                                            <div className={landingPageStyles.mobileUserWelcome}>
                                                Welcome Back
                                            </div>
                                            <button className={landingPageStyles.mobileDashboardButton}
                                                onClick={() => {
                                                    navigate('/dashboard')
                                                    setMobileMenuOpen(false)
                                                }}>
                                                Go to Dashboard
                                            </button>

                                        </div>
                                    ) : (
                                        <button className={landingPageStyles.mobileAuthButton}
                                            onClick={() => {
                                                setOpenAuthModel(true)
                                                setMobileMenuOpen(false)
                                            }}>
                                            Get Started
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                    )
                }
            </header>
        </div>
    );
};

export default LandingPage;