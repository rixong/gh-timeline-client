import React, { Component } from 'react';
import '../Timeline.css';
import moment from 'moment'
import logo from './GitHub-Mark-32px.png';

class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }

    componentDidMount() {
        this.setState({ display: true })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.display) {
            this.setState({ display: false });
        }
    }


    sortRepoByDate = (repos) => {
        return repos.sort((a, b) => b.repo_created_at.localeCompare(a.repo_created_at));
    }

    renderRepos = () => {
        return this.sortRepoByDate(this.props.repos).map((value, index) => {
            return <li key={index} >
                <div className='item-title'>
                    <timefont>
                        <a href={value.html_url} target="_blank" rel="noopener noreferrer"> <img src={logo} alt="Github mark logo" /> {value.name} </a>
                    </timefont>
                    <br></br>
                    <time>
                        🐣 {moment(value.repo_created_at).format('MMMM Do YYYY')}
                    </time>
                    <timesub>
                        ♻️ {moment(value.repo_updated_at).startOf('day').fromNow()}
                    </timesub>
                </div>
            </li>
        })
        // console.log('repos rendered')
    }


    renderTimeline = () => {

        // define variables
        let items = document.querySelectorAll(".timeline li");
        // console.log(items);

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
            // console.log(items);

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
                {/* <button onClick={this.renderTimeline}>Click to view timeline</button> */}
                <ul>
                    {this.renderRepos()}
                    {this.state.display ? this.renderTimeline() : null}
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