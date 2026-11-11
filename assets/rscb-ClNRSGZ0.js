const n="https://data.rcsb.org/graphql",i=`query GetPDBMetadata($pdbId: String!) {
  entry(entry_id: $pdbId) {
    rcsb_entry_info {
      deposited_atom_count,
      experimental_method, 
      molecular_weight,
    },
    rcsb_primary_citation {
      pdbx_database_id_DOI,
      title,
    },
    rcsb_accession_info {
      initial_release_date,
      revision_date,
    },
    struct_keywords {
      pdbx_keywords,
    },
    struct {
      title
    },
  }
}`;async function d(a,s){try{const e=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:i,variables:{pdbId:a.trim().toUpperCase()}}),signal:s});if(!e.ok)return{status:"error",message:`PDB query failed: ${e.statusText}`};const r=await e.json();if(r.errors)return{status:"error",message:`GraphQL error: ${r.errors.map(o=>o.message).join(", ")}`};const t=r.data?.entry;return t?{status:"success",data:{entryId:a.toUpperCase(),title:t.struct?.title??null,deposited_atom_count:t.rcsb_entry_info?.deposited_atom_count??null,experimental_method:t.rcsb_entry_info?.experimental_method??null,molecular_weight:t.rcsb_entry_info?.molecular_weight??null,pdbx_database_id_DOI:t.rcsb_primary_citation?.pdbx_database_id_DOI??null,citation_title:t.rcsb_primary_citation?.title??null,pdbx_keywords:t.struct_keywords?.pdbx_keywords??[],initial_release_date:t.rcsb_accession_info?.initial_release_date??null,revision_date:t.rcsb_accession_info?.revision_date??null}}:{status:"not_found",message:`No metadata found for PDB ID ${a}`}}catch(e){return{status:"error",message:e instanceof DOMException&&e.name==="AbortError"?"Request was aborted":e instanceof Error?`Network error: ${e.message}`:"Network error: Unknown error"}}}export{d as fetchPDBMetadata};
