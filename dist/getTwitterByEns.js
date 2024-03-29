"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getTwitterByENS = void 0;
function _getTwitterByENS(ens, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        // First create an ENS resolver
        try {
            const resolver = yield provider.getResolver(ens);
            console.log(`fetching ${ens}...`);
            // Then resolve their twitter handle
            return yield resolver.getText("com.twitter");
        }
        catch (error) { }
    });
}
exports._getTwitterByENS = _getTwitterByENS;
//# sourceMappingURL=getTwitterByEns.js.map