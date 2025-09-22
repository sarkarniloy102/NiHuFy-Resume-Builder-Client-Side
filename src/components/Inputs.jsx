import { inputStyles, photoSelectorStyles, titleInputStyles } from "../assets/dummystyle"
import { Eye, EyeOff, Camera, Check, Edit, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react";

export const Input = ({ value, onChange, label, placeholder, type = 'text' }) => {

    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={inputStyles.wrapper}>
            {label && <label className={inputStyles.label}>{label}</label>}
            <div className={inputStyles.inputContainer(isFocused)}>
                <input type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className={inputStyles.inputField}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)} />
                {
                    type === 'password' && (
                        <button type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={inputStyles.toggleButton}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )
                }

            </div>

        </div>
    )
};

// profile photo
export const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(preview || null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (preview) setPreviewUrl(preview);
    }, [preview]);

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setPreview?.(url);
        }
    };

    const handleRemove = () => {
        setImage(null);
        setPreviewUrl(null);
        setPreview?.(null);
    };

    const chooseFile = () => inputRef.current.click();
    return (
        <div className={photoSelectorStyles.container}>
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className={photoSelectorStyles.hiddenInput} />
            {!previewUrl ? (
                <div
                    className={photoSelectorStyles.placeholder(hovered)}
                    onClick={chooseFile}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <button type="button" className={photoSelectorStyles.cameraButton}>
                        <Camera size={20} />
                    </button>
                </div>
            ) : (
                <div
                    className={photoSelectorStyles.previewWrapper}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className={photoSelectorStyles.previewImageContainer(hovered)} onClick={chooseFile}>
                        <img src={previewUrl} alt="profile" className={photoSelectorStyles.previewImage} />
                    </div>
                    <div className={photoSelectorStyles.overlay}>
                        <button type="button" className={photoSelectorStyles.actionButton('white/80', 'white', 'gray-800')} onClick={chooseFile}>
                            <Edit size={16} />
                        </button>
                        <button type="button" className={photoSelectorStyles.actionButton('red-500', 'red-600', 'white')} onClick={handleRemove}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
// used in editresume title 
export const TitleInput = ({ title, setTitle }) => {
    const [editing, setEditing] = useState(false);
    const [focused, setFocused] = useState(false);


    return (
        <div className={titleInputStyles.container}>
            {editing ? (
                <>
                    <input
                        type="text"
                        placeholder="Resume title"
                        className={titleInputStyles.inputField(focused)}
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoFocus
                    />
                    <button className={titleInputStyles.confirmButton} onClick={() => setEditing(false)}>
                        <Check className="w-5 h-5" />
                    </button>
                </>
            ) : (
                <>
                    <h2 className={titleInputStyles.titleText}>{title}</h2>
                    <button className={titleInputStyles.editButton} onClick={() => setEditing(true)}>
                        <Edit className={titleInputStyles.editIcon} />
                    </button>
                </>
            )}
        </div>
    );
};