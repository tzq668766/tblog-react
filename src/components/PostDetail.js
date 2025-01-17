import React,{lazy,Suspense} from "react";
import Advertise from "./Advertise";
import like from '../assets/ico/like.svg'
import comment from '../assets/ico/comment.svg'
import collect from '../assets/ico/collect.svg'
import share from '../assets/ico/share.svg'
// import Comment from "./Comment";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {getPost} from '../actions/postActions';
import {getComments} from '../actions/commentActions';
import Alert from './common/Alert';
import {BarLoader} from 'react-spinners';

const Comment=lazy(()=>import("./Comment"));

class PostDetail extends React.Component{

    state={
        postId:null,
        post:null,
        comments:[],
        loading:false,
        alertData:{},
    }

    componentDidMount(){
        const postId=this.props.match.params.id;
        this.setState({postId:postId})
        this.setState({loading:true});
        this.props.getPost(postId).then((response)=>{
            this.setState({loading:false});
            //console.log('get post:',response.data.data)
            if(response.data.status){
                this.setState({post:response.data.data})
                this.loadComments(postId)
            }else{
                this.setState({alertData:response.data});
            }
        }).catch(error=>{
            console.log(error);
            this.setState({loading:false});
            this.setState({alertData:{status:false,msg:"获取帖子信息失败"}});
        });
    }

    loadComments(postId){
        this.props.getComments(postId).then((response)=>{
            //console.log('get comments:',response.data.data)
            if(response.data.status){
                this.setState({comments:response.data.data})
            }else{
                this.setState({alertData:response.data});
            }
        }).catch(error=>{
            console.log(error);
            this.setState({alertData:{status:false,msg:"获取帖子评论失败"}});
        });
    }

    reloadComments=()=>{
        console.log('reload comments',this.state.postId)
        this.loadComments(this.state.postId)
    }

    render(){
        const {post,loading,alertData,comments}=this.state

        return(
            <div className="container main">
                {/*{loading &&<div className="text-center">数据加载中...</div>}*/}
                <div className="col-md-9" id="content">
                        <ul className="breadcrumb">
                            <li><Link to="/">主页</Link><span
                                className="divider"></span></li>
                            <li>Java<span className="divider"></span></li>
                        </ul>
                        <Alert alertData={alertData}/>
                        <BarLoader loading={loading} widthUnit={'px'} heightUnit={'px'} width={823} height={6} color={'#fa0000'}/>
                        {!loading&&post &&
                            <div>
                               <div className="panel">
                                <div className="header topic-header">
                                    <h1 className="topic-full-title">{post.title}</h1>
                                    <div className="changes">
                                        <span>3个月前</span><span>&nbsp;&nbsp;作者：<a
                                        href="/tblog/pub/user/5b7d59bbbf578d05d7046ef6">{post.author.username}</a></span><span>&nbsp;&nbsp;51次浏览</span>
                                    </div>
                                </div>
                                <div className="inner topic">
                                    {post.thumbURL &&
                                        <div className="row text-center topic-thumb">
                                            <img src={process.env.REACT_APP_BASE_URL+post.thumbURL}
                                                 alt={post.title} style={{maxWidth:"100%",height:"auto"}}/>
                                        </div>
                                    }
                                    {post.desc &&<div className="row well">{post.desc}</div>}

                                    <div className="topic-content">
                                        <div dangerouslySetInnerHTML={{__html: post.contentHTML}}></div>
                                    </div>
                                    <div className="topic-tags">
                                        <span>标签：</span>
                                        {post.tags.map((tag, i) => {
                                            return(
                                                <a key={i} href="/tblog/tag/spring" className="tag">{tag}</a>
                                            )
                                        })}
                                    </div>
                                    <div className="topic-action-wrapper">
                                        <div className="topic-actions">
                                            <a href="/tblog/like/add/5b87dceabf578d115d2357ac" className="action-link">
                                                <img src={like} alt=""/>
                                                    <span>喜欢</span>
                                            </a>

                                            <a href="#reply" className="action-link">
                                                <img src={comment} alt=""/>
                                                    <span>评论</span>
                                            </a>
                                            <a id="collectLink" href="/tblog/collect/add/5b87dceabf578d115d2357ac"
                                               className="action-link" title="收藏">
                                                <img src={collect} alt=""/>
                                            </a>

                                            <a href="/" className="action-link">
                                                <img src={share} alt=""/>
                                                    <span>分享</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <Suspense fallback={<div className="text-center">加载评论中......</div>}>
                                   <Comment postId={this.state.postId}
                                            comments={comments}
                                            reloadComments={this.reloadComments}/>
                                </Suspense>
                            </div>
                        }
                    </div>
                <div className="col-md-3">
                  <Advertise/>
                </div>
            </div>
        );
    }
}

export default connect(null,{getPost,getComments})(PostDetail)