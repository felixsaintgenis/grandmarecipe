import React from 'react';
import '../../css/Footer.css';

    export default() => {
      return (
        <footer class="page-footer font-small cyan darken-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 py-5">
                  <div class="flex-center">
                    <a class="fb-ic icon">
                      <i class="fab fa-2x fa-facebook-f"></i>
                    </a>
                    <a class="tw-ic icon">
                      <i class="fab fa-2x fa-twitter"></i>
                    </a>
                    <a class="gplus-ic icon">
                      <i class="fab fa-2x fa-google-plus-g"></i>
                    </a>
                    <a class="li-ic icon">
                      <i class="fab fa-2x fa-linkedin-in"></i>
                    </a>
                    <a class="ins-ic icon">
                      <i class="fab fa-2x fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
    );
};
