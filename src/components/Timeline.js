import React, { Component } from 'react';
import '../Timeline.css';
import moment from 'moment'

class Timeline extends Component {

    // constructor() {
    //     super()
    //     this.state = {
    //     }
    // }

    sortRepoByDate = (repos) => {
        return repos.sort((a,b) => a.localeCompare(b));
    }

    renderRepos = (repos) => {
        return repos.map((value, index) => {
            return <li key={index}>
                <div className='item-title'>
                <time>
                    Date: {moment(value.repo_created_at).format('MMMM Do YYYY')}
                </time>
                    Title: {value.name}
                </div>
            </li>
        })
        // console.log('repos rendered')
    }

    renderTimeline = (repos) => {

        // define variables
        var items = document.querySelectorAll(".timeline li");

        // check if an element is in viewport
        // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function callbackFunc() {
            for (var i = 0; i < items.length; i++) {
                if (isElementInViewport(items[i])) {
                    items[i].classList.add("in-view");
                }
            }
        }

        // listen for events
        window.addEventListener("load", callbackFunc);
        window.addEventListener("resize", callbackFunc);
        window.addEventListener("scroll", callbackFunc);

    };

    render() {
        return <div>
            <section className="timeline">
                <ul>
                    {this.renderRepos(this.props.repos)}
                    {this.renderTimeline(this.props.repos)}
                    {/* Recreate HTML for length of map from li to line 56 comment
                    <li>
                        <div>
                            <time>1934</time> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
      </div>
                    </li>
                    End of li */}
                </ul>
            </section>
        </div>

    }
}
export default Timeline;