 export default function DescriptionDetails({ hotelDescriptionData }) {
    return (
      <div>
        <h5>Descriptions</h5>
        {hotelDescriptionData?.data
          .filter(element => element.descriptiontype_id === 6)
          .map((script) => (
            <p key={script.descriptiontype_id}>{script.description}</p>
        ))}
      </div>
    )
  }