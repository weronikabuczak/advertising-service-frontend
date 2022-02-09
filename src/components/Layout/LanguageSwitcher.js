import React from "react";
import { useTranslation } from "react-i18next";
import classes from './LanguageSwitcher.module.css';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    return (
            <select className={classes.language__dropdown}
                value={i18n.language}
                onChange={(e) =>
                    i18n.changeLanguage(e.target.value)
                }>
                <option value="pl">PL</option>
                <option value="en">EN</option>
            </select>
    );
}

export default LanguageSwitcher;