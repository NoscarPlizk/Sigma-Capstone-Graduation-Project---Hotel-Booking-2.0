import { Modal, Row, Col } from 'react-bootstrap';
import GetCurrency from '../../content/api/GetCurrency';
import './CurrencyBar.css';
import { useEffect, useState } from 'react';

export default function CurrencyBar({ 
  show, onHide, currency, setCurrency 
}) {

  const [ SaveCurrencyData, setSaveCurrencyData ] = useState([]);

  useEffect(() => {
    async function LoadCurrency() {
      const result = await GetCurrency();
      setSaveCurrencyData(result?.data ?? []);
    }

    LoadCurrency();
  }, []);

  console.log("SaveCurrencyData:", SaveCurrencyData);

  const updateCurrency = (selectCurrency) => {
    setCurrency(selectCurrency.code);
    onHide();
  }

  return (
    <>
      <Modal 
        show={show} 
        onHide={onHide}
        dialogClassName='currencywindows'
      >
        <Modal.Body >
          <div className='boxoftitle mb-3'>
            <Modal.Title>
              Select Currency: 
                <strong>
                  {' '}
                  {currency !== "hotel_currency" ? currency : "Hotel Local Currency"}
                  {' '}
                </strong>
              as current currency
            </Modal.Title>
            <button onClick={onHide}>Close</button>
          </div>
          <div className='currencyMainBox'>
            <Row>
              {SaveCurrencyData.map((selectCurrency, index) => (
                <Col xs={3} key={index} className='mb-2'>
                  <button 
                    className='buttonofcurrency'
                    onClick={() => updateCurrency(selectCurrency)}
                  >
                    <div className='boxofcurrency'>
                      <div><strong>{selectCurrency.name}</strong></div>
                      <div>
                        {selectCurrency.code !== "hotel_currency" 
                          ? selectCurrency.code  
                          : selectCurrency.symbol
                        }
                      </div>
                    </div>
                  </button>
                </Col>
              ))}
            </Row>            
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}