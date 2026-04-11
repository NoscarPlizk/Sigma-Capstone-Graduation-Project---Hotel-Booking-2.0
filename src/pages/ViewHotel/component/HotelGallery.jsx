export default function HotelGallery({ hotelPhotoData }) {
    
    const firstIMG = hotelPhotoData?.data[0]?.url;
    const secondIMG = hotelPhotoData?.data[1]?.url;
    const thirdIMG = hotelPhotoData?.data[2]?.url;

    const maxthumshow = 8;
    const thumbIMG = hotelPhotoData?.data?.slice(3, 3 + maxthumshow) ?? [];

    return (
      <>
        <div className="hg">
          <img 
            width="600" height="450" 
            className="hg-title hg-main"
            src={firstIMG ?? []} 
          />
          <img 
            width="300" height="225"
            className="hg-title hg-rt"
            src={secondIMG ?? []}
          />
          <img 
            width="300" height="225"
            className="hg-title hg-rb"
            src={thirdIMG ?? []}
          />
          <div className="hg-thumbs" >
            {thumbIMG.map((everyPhoto, index) => {
              return (
                <img 
                  className="hg-thumb"
                  key={index}
                  src={everyPhoto.url}
                />
              )
            })
            }
          </div>
        </div>
      </>
    )
  }
