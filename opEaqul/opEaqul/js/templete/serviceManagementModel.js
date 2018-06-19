/**
 * Created by Administrator on 2018/2/1.
 */
Vue.component('my-addson',{
    template:`<div style="text-align: right">
                    <div class="services">
                        <p>功能名称{{childInd+1}}<span></span>：</p>
                        <div>
                            <label for="text" class=" control-label">
                                <input style="" placeholder="" v-model="childMsg.functionName" class="addDeptName" maxlength="12">(不超过12个字)
                            </label>
                        </div>
                    </div>
                    <div class="services">
                        <p>功能介绍{{childInd+1}}<span></span>：</p>
                        <div>
                            <label for="text" class=" control-label">
                                <input style="" placeholder="" v-model="childMsg.introduction" class="addDeptName" maxlength="32">(不超过32个字)
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
        props: ['childMsg','childInd'],
        methods:{
            CanDelete:function(e){
                this.$emit('ievent',this.childMsg);
            }
        },
        created:function(){

        }
})
// 创建根实例
new Vue({
    el: '#addServices',
})