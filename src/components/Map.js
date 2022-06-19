import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CCloseButton } from "@coreui/react";
import { ThreeDots } from "react-loader-spinner";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  flexCenter: {
    position: "absolute",
    left: "50%",
    top: "44%",
    transform: "translate(-50%, -50%)",
  },
});
const GoogleMaps = (data) => {
  const classes = styles();
  const [chosenObject, setChosen] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAMCkInCG-VQh6ZYDys_9bgzjcnGegQbvg",
  });

  if (!isLoaded)
    return (
      <div className={classes.flexCenter}>
        <ThreeDots color="#D3D3D3" height={80} width={80} />
      </div>
    );
  return <Map />;

  function Map() {
    const center = useMemo(() => ({ lat: 56.5, lng: 10.5 }), []);
    function clickedMarker(obj) {
      //   const element = event.currentTarget;
      console.log(obj);
      setChosen(obj);
    }
    return (
      <div>
        <GoogleMap zoom={6.5} center={center} mapContainerClassName="map-container">
          {data.data.map((obj) => (
            <Marker onClick={() => clickedMarker(obj)} key={obj.dagi_id} title={"The marker`s title will appear as a tooltip."} position={{ lat: obj.visueltcenter[1], lng: obj.visueltcenter[0] }} />
          ))}
        </GoogleMap>
        {chosenObject !== false && (
          <div className="add-info">
            <div className="close">
              <CCloseButton onClick={() => setChosen(false)}></CCloseButton>
            </div>
            <div className="info-txt">
              <p>{chosenObject.regionskode}</p>
              <h2>{chosenObject.navn}</h2>

              <p>{chosenObject.region.navn}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
};
export default GoogleMaps;
