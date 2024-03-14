import { BasicApiService } from "./basic-api.service";
import { Injectable } from "@angular/core";
import { categorys } from "../model/eaiModel";

@Injectable()
export class eaiService extends BasicApiService {

  getCategorys() {

    return this.http.get<Array<categorys>>("~/api/customers/GetCategories");
  }
}
