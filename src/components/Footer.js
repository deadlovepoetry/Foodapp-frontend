import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top m-4">
        <p>© 2024 Company, Inc. All rights reserved to Anhomytroh.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <Link className="link-dark" to="#">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#twitter"></use>
              </svg>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="link-dark" to="#">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#instagram"></use>
              </svg>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="link-dark" to="#">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#facebook"></use>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
