import React, { Component } from 'react';
import AV from 'leancloud-storage';
import { Sidebar, Menu, Icon, Container, Checkbox, Image, Link } from 'semantic-ui-react'
import { browserHistory } from 'react-router'

import './css/Post.css';
import 'semantic-ui-css/semantic.min.css';
import logo from './assets/images/logo.png';

class CheckItem extends Component {
    render() {
        return (
            <div className="cha-item">
              <Checkbox label={ this.props.label } />
            </div>);
    }
}

class Content extends Component {

    render() {
        var _checklist = [];
        this.props.checklist.forEach((cha, index) => {
            var chaItem = <CheckItem key={ index } id={ index } label={ cha.header } />;
            _checklist.push(chaItem);
        });
        return (<Container id='section-to-print'>
                  <div className="cha-container">
                    <div className="post-information">
                      <h1>{ this.props.title }</h1>
                      <div className="secondaryText">
                        <span style={ { marginRight: '.5rem' } }>{ this.props.author }</span> ·
                        <span style={ { marginLeft: '.5rem' } }>{ this.props.date }</span>
                        <span className="section-not-to-print" style={ { marginLeft: '1rem' } }>{ this.props.like }</span>
                        <span className="section-not-to-print" style={ { marginLeft: '.5rem' } }><Icon link name='print'  onClick={ window.print }/></span>
                      </div>
                    </div>
                    <div className="post-intro">
                      <p>
                        { this.props.description }
                      </p>
                    </div>
                    <div className="checkbox-list">
                      { _checklist }
                    </div>
                  </div>
                </Container>);
    }
}

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            title: "title",
            author: "author",
            date: "date",
            description: 'description',
            visible: false,
            checklist: [],
            like: <Icon name="empty heart" />,
            comment: '0',
            heart: '0'
        });
        this.fetchData = this.fetchData.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }


    fetchData() {
        let _this = this;
        var query = new AV.Query('Post');

        query.equalTo('postId', this.props.postId);
        query.find().then(function(results) {
            if (results.length === 1) {
                let post = results[0];
                _this.setState({
                    title: post.get('title'),
                    author: post.get('author'),
                    date: post.get('updatedAt').toLocaleDateString(),
                    description: post.get('description'),
                    checklist: post.get('checklist'),
                    comment: post.get('comment'),
                    heart: post.get('heart')
                });
            } else {
                console.log('404')
                browserHistory.push('/404');
            }
        }, function(error) {
            browserHistory.push('/404');
        });
    }



    handleScroll(event) {
        var delta = event.deltaY;
        if (delta < 0) {
            this.toggleVisibility(true);
        } else {
            this.toggleVisibility(false);
        }
    }

    toggleVisibility = (visibility) => this.setState({
        visible: visibility
    })

    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
        this.fetchData();
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
    }

    render() {
        const {visible} = this.state;
        return (
            <div className="App">
              <div>
                <Sidebar as={ Menu } animation='overlay' direction='bottom' visible={ visible } borderless size='huge'>
                  <Menu.Item header name='home' link href='/square' target='_blank'>
                    <Image ui size="mini" src={ logo } />
                    <span>Palm</span>
                  </Menu.Item>
                  <Menu.Item name='heart' style={ { paddingRight: '.5rem' } }>
                    <Icon size='large' name='empty heart' color='green' />
                    <span className='secondaryText'> { this.state.heart }</span>
                  </Menu.Item>
                  <Menu.Item name='comments' style={ { paddingLeft: '.5rem' } }>
                    <Icon size='large' name='comment outline' style={ { marginTop: '-.35rem' } } className='secondaryText' />
                    <span className='secondaryText'>{ this.state.comment }</span>
                  </Menu.Item>
                  <Menu.Menu position='right'>
                    <Menu.Item name='heart' style={ { paddingRight: '.5rem' } }>
                      <Icon size='large' name='wechat' color='green' />
                    </Menu.Item>
                    <Menu.Item name='comments' style={ { paddingLeft: '.5rem' } }>
                      <Icon size='large' name='qq' style={ { marginTop: '-.35rem' } } className='secondaryText' />
                    </Menu.Item>
                  </Menu.Menu>
                </Sidebar>
                <Sidebar.Pusher>
                  <Content title={ this.state.title } author={ this.state.author } date={ this.state.date } like={ this.state.like } description={ this.state.description } checklist={ this.state.checklist }
                  />
                </Sidebar.Pusher>
              </div>
            </div>

            );
    }
}

export default Post;