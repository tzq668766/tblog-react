import React,{Component} from 'react'
import './Footer.css'

class Footer extends Component{
    render(){
        return (
            <div id="footer">
                <div id="footer_main">
                    <div className="links">
                        <a className="dark" href="/tblog/rss">RSS</a>
                        |
                        <a href="/tblog/swagger-ui.html" target="_blank">API</a>
                        |
                        <a className="dark"
                           href="https://github.com/tzq668766/tblog/tree/origin/tblog-springboot-mongo-thymeleaf/">源码地址</a>
                        | 本次构建于：
                        <a href="https://github.com/tzq668766/tblog/commit/c09795bfaab69c98ec784ccb5e44902458d82b64"
                           target="_blank" title="增加回复评论接口">0.0.1-2018-12-23T22:34:29+0800</a>
                    </div>

                    <div className="col_fade">
                        <p>TBlog使用Java技术，结合流行框架开发个人博客系统。</p>
                        <p>如果感觉系统比错，请不要吝啬您的星星，只需要轻轻的戳一下，谢谢！ <a
                            href="https://github.com/${fns:getConfig(&quot;git.build.user.name&quot;)}">个人博客(https://www.xxoo.com/)</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer