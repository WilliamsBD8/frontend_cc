import NavVertical from "../layouts/nav_vertical";
import NavHorizontal from "../layouts/nav_horizontal";

import '../../assets/vendor/css/pages/cards-statistics.css';
import '../../assets/vendor/css/pages/cards-analytics.css';

import '../../assets/js/dashboards-analytics';

const Dashboard = () => {
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <NavVertical/>

                <div className="layout-page">
                    <NavHorizontal/>

                    {/* <!-- Content wrapper --> */}
                    <div className="content-wrapper">
                        {/* <!-- Content --> */}

                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row g-6">
                                {/* <!-- Gamification Card --> */}
                                <div className="col-md-12 col-xxl-8">
                                <div className="card">
                                    <div className="d-flex align-items-end row">
                                    <div className="col-md-6 order-2 order-md-1">
                                        <div className="card-body">
                                        <h4 className="card-title mb-4">Congratulations <span className="fw-bold">John!</span> 🎉</h4>
                                        <p className="mb-0">You have done 68% 😎 more sales today.</p>
                                        <p>Check your new badge in your profile.</p>
                                        <a href="/dashboard" className="btn btn-primary">View Profile</a>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-center text-md-end order-1 order-md-2">
                                        <div className="card-body pb-0 px-0 pt-2">
                                        <img
                                            src="./src/assets/img/illustrations/illustration-john-light.png"
                                            height="186"
                                            className="scaleX-n1-rtl"
                                            alt="View Profile"
                                            data-app-light-img="illustrations/illustration-john-light.png"
                                            data-app-dark-img="illustrations/illustration-john-dark.png" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                {/* <!--/ Gamification Card --> */}

                                {/* <!-- Statistics Total Order --> */}
                                <div className="col-xxl-2 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                        <div className="avatar">
                                        <div className="avatar-initial bg-label-primary rounded-3">
                                            <i className="ri-shopping-cart-2-line ri-24px"></i>
                                        </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                        <p className="mb-0 text-success me-1">+22%</p>
                                        <i className="ri-arrow-up-s-line text-success"></i>
                                        </div>
                                    </div>
                                    <div className="card-info mt-5">
                                        <h5 className="mb-1">155k</h5>
                                        <p>Total Orders</p>
                                        <div className="badge bg-label-secondary rounded-pill">Last 4 Month</div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                {/* <!--/ Statistics Total Order --> */}

                                {/* <!-- Sessions line chart --> */}
                                <div className="col-xxl-2 col-sm-6">
                                <div className="card h-100">
                                    <div className="card-header pb-0">
                                    <div className="d-flex align-items-center mb-1 flex-wrap">
                                        <h5 className="mb-0 me-1">$38.5k</h5>
                                        <p className="mb-0 text-success">+62%</p>
                                    </div>
                                    <span className="d-block card-subtitle">Sessions</span>
                                    </div>
                                    <div className="card-body">
                                    <div id="sessions"></div>
                                    </div>
                                </div>
                                </div>
                                {/* <!--/ Sessions line chart --> */}

                                {/* <!-- Total Transactions & Report Chart --> */}
                                <div className="col-12 col-xxl-8">
                                <div className="card h-100">
                                    <div className="row row-bordered g-0 h-100">
                                    <div className="col-md-7 col-12 order-2 order-md-0">
                                        <div className="card-header">
                                        <h5 className="mb-0">Total Transactions</h5>
                                        </div>
                                        <div className="card-body">
                                        <div id="totalTransactionChart"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-12">
                                        <div className="card-header">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="mb-1">Report</h5>
                                        </div>
                                        <p className="mb-0 card-subtitle">Last month transactions $234.40k</p>
                                        </div>
                                        <div className="card-body pt-6">
                                        <div className="row">
                                            <div className="col-6 border-end">
                                            <div className="d-flex flex-column align-items-center">
                                                <div className="avatar">
                                                <div className="avatar-initial bg-label-success rounded-3">
                                                    <div className="ri-pie-chart-2-line ri-24px"></div>
                                                </div>
                                                </div>
                                                <p className="mt-3 mb-1">This Week</p>
                                                <h6 className="mb-0">+82.45%</h6>
                                            </div>
                                            </div>
                                            <div className="col-6">
                                            <div className="d-flex flex-column align-items-center">
                                                <div className="avatar">
                                                <div className="avatar-initial bg-label-primary rounded-3">
                                                    <div className="ri-money-dollar-circle-line ri-24px"></div>
                                                </div>
                                                </div>
                                                <p className="mt-3 mb-1">This Week</p>
                                                <h6 className="mb-0">-24.86%</h6>
                                            </div>
                                            </div>
                                        </div>
                                        <hr className="my-5" />
                                        <div className="d-flex justify-content-around align-items-center flex-wrap gap-2">
                                            <div>
                                            <p className="mb-1">Performance</p>
                                            <h6 className="mb-0">+94.15%</h6>
                                            </div>
                                            <div>
                                            <button className="btn btn-primary" type="button">view report</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                {/* <!--/ Total Transactions & Report Chart --> */}

                                {/* <!-- Performance Chart --> */}
                                <div className="col-12 col-xxl-4 col-md-6">
                                <div className="card h-100">
                                    <div className="card-header">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-1">Performance</h5>
                                    </div>
                                    </div>
                                    <div className="card-body">
                                    <div id="performanceChart"></div>
                                    </div>
                                </div>
                                </div>
                                {/* <!--/ Performance Chart --> */}
                            </div>
                        </div>
                        {/* <!-- / Content --> */}

                        {/* <!-- Footer --> */}
                        <footer className="content-footer footer bg-footer-theme">
                            <div className="container-xxl">
                                <div
                                className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                                    <div className="text-body mb-2 mb-md-0">
                                        ©
                                        2024
                                        , made with <span className="text-danger"><i className="tf-icons ri-heart-fill"></i></span> by
                                        <a href="https://pixinvent.com" target="_blank" className="footer-link">Pixinvent</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        {/* <!-- / Footer --> */}

                        <div className="content-backdrop fade"></div>
                    </div>
                    {/* <!-- Content wrapper --> */}
                </div>

            </div>
        </div>
    )
}

export default Dashboard;