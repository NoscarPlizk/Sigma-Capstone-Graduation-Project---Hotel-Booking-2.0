export default function HotelGallery({ hotelPhotoData }) {
  const firstIMG = hotelPhotoData?.data?.[0]?.url;
  const secondIMG = hotelPhotoData?.data?.[1]?.url;
  const thirdIMG = hotelPhotoData?.data?.[2]?.url;

  const maxThumbShow = 8;
  const thumbIMG = hotelPhotoData?.data?.slice(3, 3 + maxThumbShow) ?? [];

  if (!firstIMG && !secondIMG && !thirdIMG && thumbIMG.length === 0) {
    return null;
  }

  return (
    <section className="hg">
      {firstIMG ? (
        <img
          width="600"
          height="450"
          className="hg-title hg-main"
          src={firstIMG}
          alt="Hotel main view"
        />
      ) : null}

      {secondIMG ? (
        <img
          width="300"
          height="225"
          className="hg-title hg-rt"
          src={secondIMG}
          alt="Hotel gallery preview"
        />
      ) : null}

      {thirdIMG ? (
        <img
          width="300"
          height="225"
          className="hg-title hg-rb"
          src={thirdIMG}
          alt="Hotel gallery preview"
        />
      ) : null}

      {thumbIMG.length > 0 ? (
        <div className="hg-thumbs">
          {thumbIMG.map((everyPhoto, index) => (
            <img
              className="hg-thumb"
              key={`${everyPhoto?.url ?? "thumb"}-${index}`}
              src={everyPhoto?.url}
              alt={`Hotel thumbnail ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
