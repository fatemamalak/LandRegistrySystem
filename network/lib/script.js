/**

*/
/**
@param { org.acme.land.registry.Add_property} p
@transaction
*/


function add_property(p){
	p.property.owner= p.newOwner;
	return getAssetRegistry('org.acme.land.registry.Property')  
		.then(function (assetRegistry)	{
        	return assetRegistry.update(p.property);    
		});
}

