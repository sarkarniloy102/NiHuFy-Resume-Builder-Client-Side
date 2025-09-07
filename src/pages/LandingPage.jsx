import { landingPageStyles } from "../assets/dummystyle";
import { LayoutTemplate } from 'lucide-react';

const LandingPage = () => {
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

                </div>

            </header>
        </div>
    );
};

export default LandingPage;