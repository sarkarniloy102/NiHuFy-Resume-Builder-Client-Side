import { useContext, useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import { ArrowRight, LayoutTemplate, Menu, X } from 'lucide-react';
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Cards";

const LandingPage = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');

    // handle cta
    const handleCTA = () => {
        if (!user) {
            setOpenAuthModel(true);
        }
        else {
            navigate('/dashboard')
        }
    }
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
            {/* main content */}
            <main className={landingPageStyles.main}>
                <section className={landingPageStyles.heroSection}>
                    <div className={landingPageStyles.heroGrid}>
                        {/* Left content */}
                        <div className={landingPageStyles.heroLeft}>
                            <div className={landingPageStyles.tagline}>
                                Modern Resume Builder
                            </div>

                            <h1 className={landingPageStyles.heading}>
                                <span className={landingPageStyles.headingText}>  Craft </span>
                                <span className={landingPageStyles.headingGradient}>Proffessional</span>
                                <span className={landingPageStyles.headingText}>Resume</span>
                            </h1>

                            <p className={landingPageStyles.description}>
                                Turn your experience into opportunity. Smart resume templates, ATS-friendly, and trusted by recruiters
                            </p>

                            <div className={landingPageStyles.ctaButtons}>
                                <button onClick={handleCTA}
                                    className={landingPageStyles.primaryButton}>
                                    <div className={landingPageStyles.primaryButtonOverlay}></div>
                                    <span className={landingPageStyles.primaryButtonContent}>Start Building
                                        <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18} />
                                    </span>

                                </button>

                                <button onClick={handleCTA} className={landingPageStyles.secondaryButton}>
                                    View Templates
                                </button>

                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;