import React, { useState } from 'react';
import CinCard from '../User/CardCin';
import { useTranslation } from 'react-i18next';
import Languagebar from '../locales/Language';
import VoteResult from '../admin/Vote_result';

const WelcomeScreen = () => {
  const [showCinCard, setShowCinCard] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const { t } = useTranslation();

  const handleLoginClick = () => {
    setShowCinCard(true);
  };

  const handleResultClick = () => {
    setShowResultPage(true);
  };

  const handleGoBack = () => {
    setShowCinCard(false);
    setShowResultPage(false);
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <Languagebar />
      {showCinCard ? (
        <>
          <button
            type="button"
            className="btn btn-outline-secondary mb-3"
            onClick={handleGoBack}
          >
             {t('util.goback')}
          </button>
          <CinCard />
        </>
      ) : showResultPage ? (
        <>
          <button
            type="button"
            className="btn btn-outline-secondary mb-3"
            onClick={handleGoBack}
          >
             {t('util.goback')}
          </button>
          <VoteResult />
        </>
      ) : (
        <>
          <img
            className="d-block mx-auto mb-4"
            src="img/vote_icon.png"
            alt=""
            width="100"
            height="100"
          />
          <h1 className="display-5 fw-bold">{t('welcome.title')}</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">{t('welcome.text')}</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={handleLoginClick}
              >
                {t('welcome.login')}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
                onClick={handleResultClick}
              >
                {t('welcome.result')}
              </button>
            </div>
          </div>
        </>
      )}
      <div className="overflow-hidden">
        <div className="container px-5">
          <img
            src="https://c1.wallpaperflare.com/preview/13/884/56/place-tunisia-tunis-flags.jpg"
            className="img-fluid border rounded-3 shadow-lg mb-4"
            alt="Example"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
