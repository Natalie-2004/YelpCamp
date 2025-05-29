mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'cluster-map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [146.8325, -30.1346],
    zoom: 3
});

map.setMinZoom(3);

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    map.resize();
});

map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('campgrounds', {
        type: 'geojson',
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
            // with three steps to implement three types of circles:
            //   * color1, 15px circles when point count is less than 15
            //   * color2, 20px circles when point count is between 15 and 30
            //   * color3, 25px circles when point count is greater than or equal to 30
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#FFC8DD',
                10,
                '#ff8fab',
                15,
                '#BDE0FE',
                20,
                '#A2D2FF',
                25,
                '#219ebc',
                30,
                '#669bbc',
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,  // '#FFC8DD' (0-9)
                10,
                18,  // '#ff8fab' (10-14)
                15,
                21,  // '#BDE0FE' (15-19)
                20,
                24,  // '#A2D2FF' (20-24)
                25,
                27,  // '#219ebc' (25-29)
                30,
                30   // '#669bbc' (30+)
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#7f95d1',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        // when click on a cluster, it zoom in to become the new centre
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const popUpMarkup = e.features[0].properties.popUpMarkup;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                popUpMarkup
            )
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});