import React from "react"
import "@/css/index.scss"

export default class App extends React.Component{
     //是用extends 关键字实现继承
    constructor(){
        super();
        this.state={
            goodsList:[
                {name:"苹果",price:6,id:1,bool:false},
                {name:"香蕉",price:3,id:2,bool:false},
                {name:"西瓜",price:2,id:3,bool:false},
                {name:"梨子",price:5,id:4,bool:false},
                {name:"菠萝",price:10,id:5,bool:false}
            ],
            cartList:[], //购物车列表
            allPrice:0,
            allSel:false
            
        }
    }
    render(){
       return (
        <div>
            <h3>商品列表</h3>
           <ul>
               {this.state.goodsList.map((item,index)=>{
                   return (
                       <li key={index} className="box1">
                           <span>{item.name}</span>
                           <span>{item.price}</span>
                           <button onClick={this.add.bind(this,item)}>add</button>
                       </li>
                   )
               })}
           </ul>
           <h3>购物车列表</h3>
           <ul>
               {this.state.cartList.map((item,index)=>{
                   return <li key={index}>
                       <input type="checkbox" checked={item.bool} onChange={this.selCheck.bind(this,index)}/>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            
                            <button onClick={this.del.bind(this,item)}>-</button>
                            <span>{item.num}</span>
                            <button onClick={this.add.bind(this,item)}>+</button>
                            <span>单价{item.num*item.price}</span>
                         </li>
               })}
           </ul>
            <input type="checkbox" checked={this.state.allSel} onChange={this.SetallSel.bind(this)}/>
           <span>总价{this.state.allPrice}</span>
        </div>
       )
    }

    add(data){
        let cartList=[...this.state.cartList];
        let bool=true;

        if(cartList.length!=0){
            cartList.map((item)=>{
                if(item.id==data.id){
                    item.num++;
                    bool=false
                }
            })
        }
        if(bool){
            data.num=1
            cartList.push(data)
        }
        // console.log(cartList)
        // console.log(bool)
        this.setState({cartList},()=>{
            this.sum()
        })
    }
    del(data){
        let cartList=[...this.state.cartList];
        cartList.map((item,index)=>{
            if(item.id==data.id){
                item.num--;
                if(item.num==0){
                    cartList.splice(index,1)
                }
            }
        })
        this.setState({cartList},()=>{
            sum()
        })
    }
    selCheck(index,e){
        let cartList=[...this.state.cartList];
        cartList[index].bool=e.target.checked
        this.setState({cartList},()=>{
            this.sum()
        })
    }
    sum(){
        let allPrice=0;
        let allItem=[]  //勾中的数据
        let allSel=false;
        this.state.cartList.map((item)=>{
           if(item.bool){
            allPrice+=item.num*item.price
            allItem.push(item)
           }
        })
        if(this.state.cartList.length==allItem.length){
            allSel=true
       }else{
           allSel=false;
       }
        
        this.setState({allPrice,allSel})
    }
    SetallSel(e){
       let cartList=[...this.state.cartList];
       let allSel=e.target.checked;
        cartList.map((item)=>{
            if(allSel){
                item.bool=true;
            }else{
                item.bool=false;
            }
        })

        this.setState({cartList,allSel},()=>{
            this.sum()
        })
    }
}


