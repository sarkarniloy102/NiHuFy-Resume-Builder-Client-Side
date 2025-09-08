import { useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import { LayoutTemplate, Menu, X } from 'lucide-react';

const LandingPage = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className={landingPageStyles.container}>
            {/* header */}
            <header className={landingPageStyles.header}>
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
                        {}
                    </div>
                </div>

            </header>
        </div>
    );
};

export default LandingPage;