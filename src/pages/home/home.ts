import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
items = [{
  name:'',
  keyname:''
},
{
  quantity:'',
  keyname:''
}];
item ={
  name:'',
  quantity:''
}
check
name = ''
quantity
controller = '';
selectedKey = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    firebase.database().ref('/fruits/').on("value",(snapshot)=>{
      this.items =[],
      this.controller =''
      snapshot.forEach((snap)=>{
        //console.log("----->"+snap.val());
       // console.log("----->"+snap.val().quantity);
        this.items.push({name:snap.val().name,keyname:snap.key},{quantity:snap.val().quantity,keyname:snap.key});
        return false;
      });
    });


    
  }

  AddShoppingItems(){
    
    if(this.controller == "update"){

      var database = firebase.database();
    
    database.ref('/fruits/'+ this.selectedKey).set({name:this.name,quantity:0});
    
    }else{
      this.item.name= this.name;
    this.item.quantity = this.quantity;
    var database = firebase.database();
    database.ref('/fruits/').push(this.item);
    //this.controller = '';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  removeItem(i){
    console.log(i)
    var database = firebase.database();  
    database.ref('/fruits/'+ i).remove();
    this.quantity = null;
    this.name = null;
  }

  updateItem(i, selectedName, selectedQuantity){
      
    this.name = selectedName;
    this.quantity = selectedQuantity;
    this.selectedKey =i;

    this.controller = "update";
    this.AddShoppingItems();
    
    
  }

 
}
