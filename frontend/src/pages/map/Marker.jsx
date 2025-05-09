import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

const Marker = ({ map, feature, isActive, onClick }) => {
  const { geometry, properties } = feature;

  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, [geometry.coordinates, map]);
  return (
    <>
      {createPortal(
        <div
          onClick={() => onClick(feature)}
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: "50px",
            backgroundColor: isActive ? "#333" : "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            color: isActive ? "#fff" : "#333",
            textAlign: "center",
          }}
        >
          {properties.mag}
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
