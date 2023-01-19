# Projectwork GeoPerformance

This project was developed as part of the module "Open Source GIS" of the master study course Geomatics at the Karlsruhe University of Applied Sciences. The goal of the project was to test different calculation methods for Voronoi polygons and to compare their runtimes with each other. The calculation of the polygons can differ on the one hand by the used algorithm and on the other hand also by the used calculation way. The final product is a web application where the user can choose between three sets of points and two different calculation methods and can view the calculated Voronoi polygons and the performance in a diagram.
The following methods are used:

    • Delauney Triangulation in PostGIS (calculation on server side)
        ◦ ST_VoronoiPolygons()-method in PostGIS
        ◦ This calculation is not interactive for the user. When the correlated button is clicked, the precalculated polygons get visualized.
        ◦ This calculation is improved to connect the polygons with the attributes of the related points.
    • Delauney Triangulation using JavaScript (calculation on client side)
        ◦ Von wem der Code?
        ◦ Weiteres wichtige?
    • Fortune’s Algorithm using JavaScript (calculation on client side)
        ◦ Von wem code?
        ◦ Weiteres?

# OpenLayers + Vite

This example demonstrates how the `ol` package can be used with [Vite](https://vitejs.dev/).

To get started, run the following (requires Node 14+):

    npx create-ol-app my-app --template vite

Then change into your new `my-app` directory and start a development server (available at http://localhost:5173):

    cd my-app
    npm start

To generate a build ready for production:

    npm run build

Then deploy the contents of the `dist` directory to your server.  You can also run `npm run serve` to serve the results of the `dist` directory for preview.


# License

MIT Licence
