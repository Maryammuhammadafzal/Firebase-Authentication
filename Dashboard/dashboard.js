

// redirect to user profile page
let userProfile = document.getElementById('userProfile');
const showUserProfile = () => {
  window.location.href = "../User-Profile/profile.html"
}
userProfile.addEventListener('click' , showUserProfile)
// redirect to user post page
let userPosts = document.getElementById('userPosts');
const showUserPosts = () => {
  window.location.href = "../Posts/post.html"
}
userPosts.addEventListener('click' , showUserPosts)
// redirect to user login page
let signinButton = document.getElementById('signinButton');
const showsigninpage = () => {
  window.location.href = "../Login-form/login.html"
}
signinButton.addEventListener('click' , showsigninpage)
// redirect to user login page
let signupButton = document.getElementById('signupButton');
const showsignuppage = () => {
  window.location.href = "../Signup-form/signup.html"
}
signupButton.addEventListener('click' , showsignuppage)

/////////////////////////////////////////////////////////////////////////////////////////////////////

!(function () {
  const e = document.documentElement
  if (
    (e.classList.remove('no-js'),
    e.classList.add('js'),
    document.body.classList.contains('has-animations'))
  ) {
    const e = (window.sr = ScrollReveal())
    e.reveal('.hero-title, .hero-paragraph, .hero-cta', {
      duration: 1e3,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'left',
      interval: 150
    }),
      e.reveal('.hero-illustration', {
        duration: 1e3,
        distance: '40px',
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        origin: 'right',
        interval: 150
      }),
      e.reveal('.feature', {
        duration: 1e3,
        distance: '40px',
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        interval: 100,
        origin: 'bottom',
        scale: 0.9,
        viewFactor: 0.5
      }),
      document.querySelectorAll('.pricing-table').forEach(i => {
        const t = [].slice.call(i.querySelectorAll('.pricing-table-header')),
          a = [].slice.call(i.querySelectorAll('.pricing-table-features li')),
          c = [].slice.call(i.querySelectorAll('.pricing-table-cta')),
          r = t.concat(a).concat(c)
        e.reveal(r, {
          duration: 600,
          distance: '20px',
          easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
          interval: 100,
          origin: 'bottom',
          viewFactor: 0.5
        })
      })
  }
})()
