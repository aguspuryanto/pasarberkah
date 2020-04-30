import { Product } from './../entities/product';
import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';  // alt + shift +down
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { LoadingController } from 'ionic-angular';



@Injectable()
export class ProductService {
  loading : any;
  prod: boolean = false;
  // apiUrl: string;

  constructor(
    public loadingCtrl: LoadingController, 
    private http: Http,
    @Inject('apiUrl') private apiUrl
    ) {
      // this.apiUrl = (this.prod==true) ? 'http://mysod.xyz/pasarberkah/' : 'http://localhost/evoush/';
    }

  async loadingshow(){
    if(!this.loading){
      const loading = await this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Loading',
        duration: 3000,
        dismissOnPageChange: true,
        showBackdrop: true,
        enableBackdropDismiss: true
      });
      return await loading.present();
    }
  }

  async dismissLoading(){
    // console.log(this.loading);
    if(this.loading){
      await this.loading.dismiss();
    }
  }

  getProducts(seoUrl?:any): Observable<Product[]> {
    if(seoUrl){
      return this.http.get(this.apiUrl + 'product/get_produk?page=' + seoUrl).map(response => response.json());
    }else{
      // return this.http.get(this.apiUrl + 'pigiShopApi/products.php').map(response => response.json());
      return this.http.get(this.apiUrl + 'product/get_produk').map(response => response.json());
    }
  }
  
  get( url, load = ''){
    if(load == ''){
      this.loadingshow();
    }
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res.json());
        this.dismissLoading();
      }, (err) => {
        reject(err);
        this.dismissLoading();
      });
    });
  }

  post( url, post, load = ''){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.loadingshow();
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'api/' + url, (post), {headers: headers})
      .subscribe(res => {
        console.log("result", res.json());
        resolve(JSON.parse(res.json()));
        // this.dismissLoading();
      }, (err) => {
        reject(err);
        // this.dismissLoading();
      });
    });
  }

  getKecamatan(id_kota){
    return this.get(this.apiUrl + 'api/cek_village2?kab_id=' + id_kota);
  }

  /*
   * method = POST
   * origin = 11 (Aceh Utara)
   * destination = 133 (Gresik)
   * weight = 200
   * courier = jne
   */

  getOngkir(params){
    var origin = params.origin;
    var destination = params.destination;
    var weight=100;
    var courier="jne";
    // origin=asal&destination=kab_id&weight=berat&courier=kurir
    // return this.post('cek_ongkir', params);
    return this.get(this.apiUrl + 'api/cek_ongkir?origin=' + origin + '&destination=' + destination + '&weight=' + weight + '&courier=' + courier);
  }

}
