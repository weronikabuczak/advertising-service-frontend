import React from "react";
import { useTranslation } from "react-i18next";
import classes from './Navigation.module.css';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    return (
            <select className={classes.languageSelect}
                value={i18n.language}
                onChange={(e) =>
                    i18n.changeLanguage(e.target.value)
                }>
                <option value="pl">Polski</option>
                <option value="en">English</option>
            </select>
    );
}

export default LanguageSwitcher;