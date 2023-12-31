import React from 'react';
import { useTranslation } from 'react-i18next';

const Languagebar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  
  return (
    <header>
      <nav>
        <div className="container">
          <div>
            <select className="form-select" onChange={(e) => changeLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">عربي</option>
            </select>
          </div>
        </div>
       
      </nav>
    </header>
  );
};

export default Languagebar;
