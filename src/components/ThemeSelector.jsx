import { useRef, useState } from "react";
import { resumeTemplates } from "../utils/data";
import Tabs from "./Tabs";


const TAB_DATA = [{ label: 'Templates' }]

const ThemeSelector = ({ selectedTheme, setSelectedTheme, resumeData, onClose }) => {

    const resumeRef = useRef(null)
    const [baseWidth, setBaseWidth] = useState(800);

    // selected theme template using id
    const initialIndex = resumeTemplates.findIndex(t => t.id === selectedTheme)
    const [selectedTheme, setSelectedTheme] = useState({
        theme: selectedTheme || resumeTemplates[0]?.id || "",
        index: initialIndex >= 0 ? initialIndex : 0
    })
    const [tabValue, setTabValue] = useState('Templates')
    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 sm:p-6 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100">
                <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setActiveTab} />
            </div>

        </div>
    );
};

export default ThemeSelector;