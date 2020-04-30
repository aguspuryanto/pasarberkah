import { CartItem } from '../../entities/cart-item';
import { CartService } from "../../providers/cart.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { CheckoutPage } from '../checkout/checkout';
import { Http } from '@angular/http';
import { ProductService } from '../../providers/product.service';
import { ListKabupatenPage } from '../list-kabupaten/list-kabupaten';

@IonicPage()
@Component({
  selector: "page-shopping-cart",
  templateUrl: "shopping-cart.html"
})
export class ShoppingCartPage {

  provinsi: any = [];
  citys: any = [];
  kecamatans: any = [];
  rajaongkir: any = [];

  kode_outlet: string;
  nama_outlet: string;
  alamat_outlet: string;
  id_provinsi: number = 11;
  id_kota: number;
  id_kecamatan: number;
  id_desa: string;
  
  cartItems:CartItem[]=[];
  cartTotal: number = 0;

  paymentValue: string;
  costCodText: string = "COD";
  costCod: number = 5000;
  costBank: any = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public productService: ProductService,
    public http: Http,
  ) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShoppingCartPage");
    this.cartItems=this.cartService.list();
    if(this.cartItems) this.cartTotal = this.cartItems.map(item => (item.quantity*item.product.unitPrice)).reduce((prev, next) => prev + next, 0);

    this.getCityJson();
  }

  goChekout(){
    this.navCtrl.push(CheckoutPage);
  }

  getCityJson(){
      this.http.get('assets/data/kota.json').map(res => res.json()).subscribe((data)=> {
        // console.log(JSON.stringify(data));
        let citysjson = data['rajaongkir']['results'];
        this.citys = citysjson.filter(item => {
          return item.province_id.indexOf(this.id_provinsi) > -1;
        });
      },error=>{
        console.log(error);// Error getting the data
      });
  }

  onSelectKab(){
    this.productService.getKecamatan(this.id_kota).then((data: any[])=> {
      this.kecamatans = data['rajaongkir']['results'];
    });
  }

  openKabSelect() {
    let data = [];
    for (let index = 0; index < this.citys.length; index++) {
      const el = this.citys[index];
      data.push({ name: el.city_name, key: el.city_id });
    }
    let modal = this.modalCtrl.create(ListKabupatenPage, { data: data, titleText: "Please Select" });
    modal.onDidDismiss((data) => {
      console.log("data", data);
    });
    modal.present();
  }

  getPayment(value){
    console.log("radioSelect",value);
    if(value=='cod' && this.costCod==5000) this.getOngkir();
    if(value=='transfer' && this.costBank==0) {
      this.costBank = (Math.floor(Math.random() * 100) + 100).toString().substring(1);
    }
  }

  getOngkir(){
    // origin, destination, weight=100, courier="jne"
    if(localStorage.getItem('rajaongkir')) {
      this.rajaongkir = JSON.parse(localStorage.getItem('rajaongkir'));
      // console.log('__rajaongkir', this.rajaongkir);
    } else {

      var options = {
        origin: 133,
        destination: 134,
        weight: 100,
        courier: 'jne',
      }

      this.productService.getOngkir(options).then((data: any[])=> {
        // console.log('rajaongkir', data);
        this.rajaongkir = data['rajaongkir']['results'];
        localStorage.setItem('rajaongkir', JSON.stringify(data['rajaongkir']['results']));
      });

    }
    
    // costs
    if (this.rajaongkir[0]['costs']){
      // console.log("costs", this.rajaongkir[0]['costs'].length);
      // console.log("cost0_service", this.rajaongkir[0]['costs'][0]['service']);
      // console.log("cost0_val", this.rajaongkir[0]['costs'][0]['cost'][0]['value']);
      // this.costCodText = this.costCodText + " + " + this.rajaongkir[0]['costs'][0]['description'];
      this.costCod = this.costCod + this.rajaongkir[0]['costs'][0]['cost'][0]['value'];
    }
  }

  getLocation(){
    // var options = {
    //   enableHighAccuracy: true,
    //   maximumAge : 60000,
    //   timeout : 10000
    // };
    
    // this.geolocation.getCurrentPosition(options).then((position) => {
    //   this.latlng = position.coords.latitude+','+position.coords.longitude;
    //   console.log("latlng", this.latlng);
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }
}
