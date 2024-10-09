

const Forgot = () => {
    return (
        <div className="position-relative">
      <div className="authentication-wrapper authentication-basic container-p-y p-4 p-sm-0">
        <div className="authentication-inner py-6">
          <div className="card p-md-7 p-1">
            <div className="app-brand justify-content-center mt-5">
              <a href="index.html" className="app-brand-link gap-2">
                <span className="app-brand-text demo text-heading fw-semibold">Materialize</span>
              </a>
            </div>
            <div className="card-body mt-1">
              <h4 className="mb-1">Forgot Password? 🔒</h4>
              <p className="mb-5">Enter your email and we'll send you instructions to reset your password</p>
              <form id="formAuthentication" className="mb-5" action="auth-reset-password-basic.html" method="GET">
                <div className="form-floating form-floating-outline mb-5">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    autofocus />
                  <label>Email</label>
                </div>
                <button className="btn btn-primary d-grid w-100">Send Reset Link</button>
              </form>
              <div className="text-center">
                <a href="/login" className="d-flex align-items-center justify-content-center">
                  <i className="ri-arrow-left-s-line scaleX-n1-rtl ri-20px me-1_5"></i>
                  Back to login
                </a>
              </div>
            </div>
          </div>
          <img
            alt="mask"
            src="./src/assets/img/illustrations/auth-basic-forgot-password-mask-light.png"
            className="authentication-image d-none d-lg-block"
            data-app-light-img="illustrations/auth-basic-forgot-password-mask-light.png"
            data-app-dark-img="illustrations/auth-basic-forgot-password-mask-dark.png" />
        </div>
      </div>
    </div>
    )
}

export default Forgot;