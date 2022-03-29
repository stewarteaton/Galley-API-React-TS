<h1>React Photo Gallery API APP</h1>
<hr>
<ul><li>https://photo-gallery-app192837.web.app/</ul></li>

<br/>
<h3>Backend</h3>
<hr>
    <ul>
        <li> Used Node Express to create a REST API server</li>
        <li> Deployed the the API to Firebase Functions to run in the cloud </li>
        <li> Used Unsplash API to query images requested by user, and passed image data to React frontend</li>
        <li> Obscures users interaction or visibility to  Unsplash API </li>
        <li> Implemented error handling</li>
    </ul>

<br/>
<br/>

<h3>Frontend</h3>
<hr>
    <ul>
        <li> Started with create-react-app typescript template</li>
        <li>Used MaterialUI library for stylish interface components</li>
        <li>Input to search for images, that sends request to backend API </li>
        <li>Hooks to manage front end state: loading, errors, page view, endless scroll, query</li>
        <li>Used IntersectionObserver to detect when user scrolled to bottom of screen and to trigger hooks to fetch additional photos </li>
        <li>Created responsive gallery compnent for photos which resizes to screen size and allows an overlay when a specific image is clicked</li>
    </ul>

<br />
<h3>Limitations</h3>
<hr>
<ul>
<li>50 api requests per hour</li>
</ul>

