import React, { useState, memo } from "react";
import { filter } from "lodash";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import map from "../utils/ne_10m_admin_0_countries_simplified.json";
import "../css/styles.css";
import {
  baseColour,
  defaultColour,
  selectColour,
  strokeColour,
} from "../utils/colours";
import { lookupKeyByISO } from "../utils/fetchLookupKey";

const geoUrl = map;

const MapChart = ({
  setTooltipContent,
  setSelectedCountries,
  selectedCountries,
}) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const ZoomControls = () => {
    return (
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="map">
      <ZoomControls />
      <ComposableMap
        data-tip=""
        projection="geoEquirectangular"
        projectionConfig={{ scale: 170 }}
        width={1080}
        height={551}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { NAME, ISO_A3 } = geo.properties;
                const isSelected =
                  selectedCountries
                    .map(({ ISO_A3 }) => ISO_A3)
                    .indexOf(ISO_A3) !== -1;

                const selectedCountry = filter(selectedCountries, {
                  ISO_A3,
                })[0];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME, ISO_A3 } = geo.properties;
                      setTooltipContent({ NAME, ISO_A3 });
                    }}
                    onMouseUp={() => {}}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCountries((item) =>
                          filter(item, (e) => e.ISO_A3 !== ISO_A3)
                        );
                      } else {
                        const hasCovidDataMatch = lookupKeyByISO(ISO_A3);
                        if (hasCovidDataMatch) {
                          setSelectedCountries((item) => [
                            {
                              ISO_A3,
                              NAME,
                              colour: selectColour(item),
                            },
                          ]);
                        }
                      }
                    }}
                    style={{
                      default: {
                        // fill: defaultColour,
                        fill: isSelected
                          ? `${selectedCountry.colour}`
                          : defaultColour,
                        stroke: strokeColour,
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: isSelected ? selectedCountry.colour : baseColour,
                        stroke: strokeColour,
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      click: {
                        fill: baseColour,
                        stroke: strokeColour,
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
