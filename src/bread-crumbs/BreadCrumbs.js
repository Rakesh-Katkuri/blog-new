import React from 'react'
import { Link } from 'react-router-dom';

const BreadCrumbs = () => {
    const pathSegments = window.location.pathname.split("/").filter((segment) => segment !== "");
  return (
    <nav aria-label='breadcrumb'>
<ol className='breadcrumb'>
    {pathSegments.map((segment, index) => (
        <li key={index} className={`breadcrumb-item ${index === pathSegments.length - 1 ? "active" : ""}`}>
            {index === pathSegments.length - 1 ? (
                segment //last segment is active(not a link)
            ):(
                <Link to={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                    {segment}
                </Link>
            )}
        </li>
    ))}

</ol>
    </nav>
  )
}

export default BreadCrumbs