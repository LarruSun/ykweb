/**
 * Created by Administrator on 2018/2/1.
 */
Vue.component('my-addson',{
    template:`<div style="text-align: right">
                    <div class="services">
                        <p>公能名称<span>1</span>：</p>
                        <div>
                            <label for="text" class=" control-label">
                                <input style="" placeholder="" v-model="CanName" class="addDeptName">
                                <span class="lbl font_size">%</span>
                            </label>
                        </div>
                    </div>
                    <div class="services">
                        <p>公能介绍<span>1</span>：</p>
                        <div>
                            <label for="text" class=" control-label">
                                <input style="" placeholder="" v-model="CanIntroduce" class="addDeptName">
                                <span class="lbl font_size">%</span>
                            </label>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary a_bottom" @click="CanDelete" style="margin-top: -81px;">删除</a>
                </div>`,
        data:function(){
            return {
                CanName:'',//公能名称
                CanIntroduce:''//公能介绍
            }
        },
        methods:{
            CanDelete:function(e){
                console.log(e)
            }
        }
})
// 创建根实例
new Vue({
    el: '#addServices',
})