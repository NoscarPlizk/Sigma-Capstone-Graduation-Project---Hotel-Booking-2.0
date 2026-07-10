import { Modal, Row, Col, Spinner } from 'react-bootstrap';
import GetCurrency from '../../content/api/GetCurrency';
import './CurrencyBar.css';
import { useEffect, useState } from 'react';
import { FiCheck, FiGlobe, FiX } from "react-icons/fi";

export default function CurrencyBar({ 
  show, onHide, currency, setCurrency 
}) {

  const [ SaveCurrencyData, setSaveCurrencyData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    async function LoadCurrency() {
      setIsLoading(true);
      const result = await GetCurrency();
      setSaveCurrencyData(result?.data ?? []);
      setIsLoading(false);
    }

    LoadCurrency();
  }, []);

  // console.log("SaveCurrencyData:", SaveCurrencyData);

  const updateCurrency = (selectCurrency) => {
    setCurrency(selectCurrency.code);
    onHide();
  }

  const currentCurrencyLabel =
    currency !== "hotel_currency" ? currency : "Hotel Local Currency";

  return (
    <>
      <Modal 
        show={show} 
        onHide={onHide}
        dialogClassName='currency-modal-window'
        centered
      >
        <Modal.Body className='currency-modal-body'>
          <div className='currency-modal-header'>
            <div className='currency-modal-title-block'>
              <div className='currency-modal-title-icon'>
                <FiGlobe />
              </div>
              <div>
                <span className='currency-modal-eyebrow'>Display preference</span>
                <Modal.Title className='currency-modal-title'>
                  Choose your currency
                </Modal.Title>
                <p className='currency-modal-description'>
                  Prices across the booking flow will use your selected display currency.
                </p>
              </div>
            </div>

            <button
              type="button"
              className='currency-modal-close'
              onClick={onHide}
              aria-label='Close currency modal'
            >
              <FiX />
            </button>
          </div>

          <div className='currency-modal-current'>
            <span className='currency-modal-current-label'>Current currency</span>
            <strong>{currentCurrencyLabel}</strong>
          </div>

          {isLoading ? (
            <div className='currency-modal-loading'>
              <Spinner animation="border" size="sm" />
              <span>Loading currencies...</span>
            </div>
          ) : (
            <div className='currency-grid-shell'>
              <Row className='g-3'>
                {SaveCurrencyData.map((selectCurrency, index) => {
                  const isSelected = currency === selectCurrency.code;
                  const displayLabel =
                    selectCurrency.code !== "hotel_currency"
                      ? selectCurrency.code
                      : selectCurrency.symbol;

                  return (
                    <Col xl={3} lg={4} sm={6} xs={12} key={index}>
                      <button
                        type="button"
                        className={`currency-card ${isSelected ? "is-selected" : ""}`}
                        onClick={() => updateCurrency(selectCurrency)}
                      >
                        <div className='currency-card-top'>
                          <div className='currency-card-copy'>
                            <strong>{selectCurrency.name}</strong>
                            <span>{displayLabel}</span>
                          </div>
                          {isSelected ? (
                            <span className='currency-card-check'>
                              <FiCheck />
                            </span>
                          ) : null}
                        </div>
                      </button>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
