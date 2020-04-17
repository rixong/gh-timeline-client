import React, { Component } from 'react';
import '../Timeline.css';
import ModalContainer from './ModalContainer.js';
import moment from 'moment'
import logo from './GitHub-Mark-32px.png';

class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clickedRepo: 0,
            modalDisplay: false
        }
    }

    sortRepoByDate = (repos) => {
        return repos.sort((a, b) => b.repo_created_at.localeCompare(a.repo_created_at));
    }

    /// Grabs specific git_id from click event. Sets state with that ID (if modal is closed) and flips modalDisplay state to true. 
    /// Both elements of state are passed to Modal Container where they are evaluated (if 'clickedRepo' = 'github_id'), and passed to Modal (true or false)
    modalToggle = (e) => {

        let ele = e.target.closest('.item-title')
        let id = 0;
        if (ele) {
            id = ele.dataset.id
        } 
        
        this.setState({
            modalDisplay: !this.state.modalDisplay,
            clickedRepo: id
        })
    }

    renderRepos = () => {
        return this.sortRepoByDate(this.props.repos).map((repo) => {
            return <li key={repo.git_id} >
                <div className='item-title' data-id={repo.git_id} onClick={this.modalToggle}>
                    <time>
                    <img src={logo} alt="Github mark logo" /> {repo.name}
                    {/* <br></br> */}
                    <span role="img" aria-label="hatching-chick">🐣</span> {moment(repo.repo_created_at).format('MMMM Do YYYY')}
                    <span role="img" aria-label="recycling-symbol"> ♻️</span> {moment(repo.repo_updated_at).startOf('day').fromNow()}
                    </time>

                    <ModalContainer repo={repo} clicked={this.state}/>
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

        window.addEventListener("load", callbackFunc);
        window.addEventListener("resize", callbackFunc);
        window.addEventListener("scroll", callbackFunc);

    };

    render() {
        
        return <div>
            <section className="timeline">
                <ul>
                    {this.renderRepos()}
                    {this.renderTimeline()}
                </ul>
            </section>
        </div>

    }
}
export default Timeline;