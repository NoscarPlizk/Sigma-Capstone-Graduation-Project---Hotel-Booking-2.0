
function LeftBar() {
  return (
    <>
      <div>
        <div>
          <img />
          <h4></h4>
        </div>
        <div>
          <h4>Your booking details</h4>
          <div>
            <div>
              <p>Check In</p>
              <Date />            
            </div>
            <div>
              <p>Check In</p>
              <Date />            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function RightBar() {
  return (
    <>
      <div className="border">
        <div>
          <h5>Guest Details</h5>
          <div className="d-flex mb-3">
            <div>
              <p>First Name</p>
              <input />
            </div>
            <div>
              <p>Last Name</p>
              <input />
            </div>
          </div>
          <div>
            <h5>Booking Contact</h5>
            <div>
              <p>Email Address</p>
              <input />
            </div>
            <div className="d-flex">
              <div className="me-3">
                <p>Country/Region</p>
                <select />
              </div>
              <div>
                <p>Phone</p>
                <select />
                <input />
              </div>
            </div>
            <p>Input phone number exclude initial digit 0 like 0/13-323-1323</p>
          </div>
          <div>
            <div>
              <h5>Who are you Booking for?</h5>
              <p>I'm the main guest</p>
              <p>I'm booking for someone else</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function PurchasePortal() {
  return (
    <div className="d-flex">
      <LeftBar />
      <RightBar />
    </div>
  )
}