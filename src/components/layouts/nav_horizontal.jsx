const NavHorizontal = () => {
    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar">
              
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-6" href="!#">
                <i className="ri-menu-fill ri-22px"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li className="nav-item dropdown-style-switcher dropdown me-1 me-xl-0">
                  <a
                    className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
                    href="!#"
                    data-bs-toggle="dropdown">
                    <i className="ri-22px"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                    <li>
                      <a className="dropdown-item" href="!#" data-theme="light">
                        <span className="align-middle"><i className="ri-sun-line ri-22px me-3"></i>Light</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="!#" data-theme="dark">
                        <span className="align-middle"><i className="ri-moon-clear-line ri-22px me-3"></i>Dark</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="!#" data-theme="system">
                        <span className="align-middle"><i className="ri-computer-line ri-22px me-3"></i>System</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-4 me-xl-1">
                  <a
                    className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
                    href="!#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false">
                    <i className="ri-notification-2-line ri-22px"></i>
                    <span
                      className="position-absolute top-0 start-50 translate-middle-y badge badge-dot bg-danger mt-2 border"></span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end py-0">
                    <li className="dropdown-menu-header border-bottom py-50">
                      <div className="dropdown-header d-flex align-items-center py-2">
                        <h6 className="mb-0 me-auto">Notification</h6>
                        <div className="d-flex align-items-center">
                          <span className="badge rounded-pill bg-label-primary fs-xsmall me-2">8 New</span>
                          <a
                            href="!#"
                            className="btn btn-text-secondary rounded-pill btn-icon dropdown-notifications-all"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Mark all as read"
                            ><i className="ri-mail-open-line text-heading ri-20px"></i></a>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown-notifications-list scrollable-container">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="./src/assets/img/avatars/1.png"  className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="small mb-1">Congratulation Lettie 🎉</h6>
                              <small className="mb-1 d-block text-body">Won the monthly best seller gold badge</small>
                              <small className="text-muted">1h ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Charles Franklin</h6>
                              <small className="mb-1 d-block text-body">Accepted your connection</small>
                              <small className="text-muted">12hr ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="./src/assets/img/avatars/2.png"  className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">New Message ✉️</h6>
                              <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                              <small className="text-muted">1h ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-success"
                                  ><i className="ri-shopping-cart-2-line"></i></span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Whoo! You have new order 🛒</h6>
                              <small className="mb-1 d-block text-body">ACME Inc. made new order $1,154</small>
                              <small className="text-muted">1 day ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="./src/assets/img/avatars/9.png"  className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Application has been approved 🚀</h6>
                              <small className="mb-1 d-block text-body"
                                >Your ABC project application has been approved.</small>
                              <small className="text-muted">2 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-success"
                                  ><i className="ri-pie-chart-2-line"></i></span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Monthly report is generated</h6>
                              <small className="mb-1 d-block text-body">July monthly financial report is generated </small>
                              <small className="text-muted">3 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="./src/assets/img/avatars/5.png"  className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">Send connection request</h6>
                              <small className="mb-1 d-block text-body">Peter sent you connection request</small>
                              <small className="text-muted">4 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <img src="./src/assets/img/avatars/6.png"  className="rounded-circle" />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">New message from Jane</h6>
                              <small className="mb-1 d-block text-body">Your have new message from Jane</small>
                              <small className="text-muted">5 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar">
                                <span className="avatar-initial rounded-circle bg-label-warning"
                                  ><i className="ri-error-warning-line"></i></span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1 small">CPU is running high</h6>
                              <small className="mb-1 d-block text-body"
                                >CPU Utilization Percent is currently at 88.63%,</small>
                              <small className="text-muted">5 days ago</small>
                            </div>
                            <div className="flex-shrink-0 dropdown-notifications-actions">
                              <a href="!#" className="dropdown-notifications-read"
                                ><span className="badge badge-dot"></span></a>
                              <a href="!#" className="dropdown-notifications-archive"
                                ><span className="ri-close-line ri-20px"></span></a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li className="border-top">
                      <div className="d-grid p-4">
                        <a className="btn btn-primary btn-sm d-flex" href="!#">
                          <small className="align-middle">View all notifications</small>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a className="nav-link dropdown-toggle hide-arrow" href="!#" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src="./src/assets/img/avatars/1.png"  className="rounded-circle" />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="pages-account-settings-account.html">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-2">
                            <div className="avatar avatar-online">
                              <img src="./src/assets/img/avatars/1.png"  className="rounded-circle" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-medium d-block small">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-profile-user.html">
                        <i className="ri-user-3-line ri-22px me-3"></i><span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-account-settings-account.html">
                        <i className="ri-settings-4-line ri-22px me-3"></i><span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-account-settings-billing.html">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 ri-file-text-line ri-22px me-3"></i>
                          <span className="flex-grow-1 align-middle">Billing</span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-pricing.html">
                        <i className="ri-money-dollar-circle-line ri-22px me-3"></i><span className="align-middle">Pricing</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="pages-faq.html">
                        <i className="ri-question-line ri-22px me-3"></i><span className="align-middle">FAQ</span>
                      </a>
                    </li>
                    <li>
                      <div className="d-grid px-4 pt-2 pb-1">
                        <a className="btn btn-sm btn-danger d-flex" href="auth-login-cover.html" target="_blank">
                          <small className="align-middle">Logout</small>
                          <i className="ri-logout-box-r-line ms-2 ri-16px"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
    )
}

export default NavHorizontal;