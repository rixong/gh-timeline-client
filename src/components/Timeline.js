import React, { Component } from 'react';
import '../Timeline.css';
import Modal from './Modal.js';
import moment from 'moment'
import logo from './GitHub-Mark-32px.png';

class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // display: false,
            modal: false
        }
    }

    componentDidMount() {
        this.setState({ display: true })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.display) {
    //         this.setState({ display: false });
    //     }
    // }

    sortRepoByDate = (repos) => {
        return repos.sort((a, b) => b.repo_created_at.localeCompare(a.repo_created_at));
    }

    modalToggle = () => {
        console.log("Toggle");
        
        this.setState({
            modal: !this.state.modal
        })
    }

    renderRepos = () => {
        return this.sortRepoByDate(this.props.repos).map((repo) => {
            return <li key={repo.git_id} >
                <div className='item-title' onClick={this.modalToggle}>
                    <time>
                    <img src={logo} alt="Github mark logo" /> {repo.name}
                    {/* <br></br> */}
                    <span role="img" aria-label="hatching-chick">🐣</span> {moment(repo.repo_created_at).format('MMMM Do YYYY')}
                    <span role="img" aria-label="recycling-symbol"> ♻️</span> {moment(repo.repo_updated_at).startOf('day').fromNow()}
                    </time>

                    <Modal repo={repo}/>
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


        // document.querySelectorAll(".timeline li").forEach(el => el.classList.remove)
        


        return <div>
            <section className="timeline">
                <ul>
                    {this.renderRepos()}
                    {this.renderTimeline()}
                    {/* {this.state.display ? this.renderTimeline() : null} */}
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