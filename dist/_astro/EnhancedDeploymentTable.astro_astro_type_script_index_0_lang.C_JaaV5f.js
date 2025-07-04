import{d as o}from"./dashboardData.BFIWEmhj.js";class c{constructor(){this.deployments=[],this.filteredDeployments=[],this.currentPage=1,this.itemsPerPage=10,this.sortField="timestamp",this.sortDirection="desc",this.init(),this.loadDeployments()}init(){document.getElementById("deployment-search")?.addEventListener("input",s=>{const a=s.target;this.handleSearch(a.value)});const e=document.getElementById("environment-filter"),i=document.getElementById("status-filter");e?.addEventListener("change",()=>this.handleFilter()),i?.addEventListener("change",()=>this.handleFilter()),document.getElementById("refresh-deployments")?.addEventListener("click",()=>this.refreshDeployments()),document.querySelectorAll("[data-sort]").forEach(s=>{s.addEventListener("click",()=>{const a=s.getAttribute("data-sort");a&&this.handleSort(a)})}),this.setupRealTimeUpdates()}loadDeployments(){this.showLoading(),setTimeout(()=>{this.deployments=o.generateDeployments(),this.filteredDeployments=[...this.deployments],this.renderTable(),this.renderPagination(),this.hideLoading()},500)}refreshDeployments(){const e=document.getElementById("refresh-deployments")?.querySelector("svg");e?.classList.add("animate-spin"),this.loadDeployments(),setTimeout(()=>{e?.classList.remove("animate-spin")},1e3)}handleSearch(t){this.filteredDeployments=this.deployments.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())||e.author.toLowerCase().includes(t.toLowerCase())||e.id.toLowerCase().includes(t.toLowerCase())),this.currentPage=1,this.renderTable(),this.renderPagination()}handleFilter(){const t=document.getElementById("environment-filter"),e=document.getElementById("status-filter"),i=t?.value||"",r=e?.value||"";this.filteredDeployments=this.deployments.filter(s=>{const a=!i||s.environment===i,n=!r||s.status===r;return a&&n}),this.currentPage=1,this.renderTable(),this.renderPagination()}handleSort(t){this.sortField===t?this.sortDirection=this.sortDirection==="asc"?"desc":"asc":(this.sortField=t,this.sortDirection="desc"),this.filteredDeployments.sort((e,i)=>{let r,s;switch(t){case"name":r=e.name,s=i.name;break;case"environment":r=e.environment,s=i.environment;break;case"status":r=e.status,s=i.status;break;case"timestamp":r=new Date(e.timestamp).getTime(),s=new Date(i.timestamp).getTime();break;default:return 0}return r<s?this.sortDirection==="asc"?-1:1:r>s?this.sortDirection==="asc"?1:-1:0}),this.renderTable(),this.updateSortIndicators(t)}updateSortIndicators(t){document.querySelectorAll("[data-sort]").forEach(e=>{const i=e.getAttribute("data-sort"),r=e.querySelector("svg");i===t?(r?.classList.remove("opacity-50"),r?.classList.add("opacity-100")):(r?.classList.add("opacity-50"),r?.classList.remove("opacity-100"))})}renderTable(){const t=document.getElementById("deployments-tbody");if(!t)return;const e=(this.currentPage-1)*this.itemsPerPage,i=e+this.itemsPerPage,r=this.filteredDeployments.slice(e,i);t.innerHTML=r.map(s=>this.renderDeploymentRow(s)).join(""),t.querySelectorAll(".view-deployment").forEach((s,a)=>{s.addEventListener("click",()=>this.showDeploymentDetails(r[a]))})}renderDeploymentRow(t){const e={success:"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",running:"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",failed:"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",pending:"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"},i={production:"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",staging:"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",development:"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"},r=a=>new Date(a).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),s=a=>{if(!a)return"N/A";const n=Math.floor(a/60),d=a%60;return`${n}m ${d}s`};return`
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span class="text-white font-semibold text-sm">${t.name.substring(0,2).toUpperCase()}</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100">${t.name}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">${t.id}</div>
                ${t.version?`<div class="text-xs text-gray-400 dark:text-gray-500">${t.version}</div>`:""}
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${i[t.environment]}">
              ${t.environment}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${e[t.status]}">
              ${t.status}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
            ${r(t.timestamp)}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900 dark:text-gray-100">${t.author}</div>
            ${t.commit?`<div class="text-xs text-gray-500 dark:text-gray-400">${t.commit}</div>`:""}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
            ${s(t.duration)}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
            <button class="view-deployment text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
              View
            </button>
            <button class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200">
              Logs
            </button>
          </td>
        </tr>
      `}showDeploymentDetails(t){const e=document.getElementById("deployment-modal-content");e&&(e.innerHTML=this.renderDeploymentDetails(t),window.deploymentDetailsModal?.open())}renderDeploymentDetails(t){return`
        <div class="space-y-6">
          <!-- Header Section -->
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span class="text-white font-semibold">${t.name.substring(0,2).toUpperCase()}</span>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${t.name}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">${t.id}</p>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">${t.status}</dd>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Environment</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">${t.environment}</dd>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Author</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">${t.author}</dd>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">${t.duration?`${Math.floor(t.duration/60)}m ${t.duration%60}s`:"N/A"}</dd>
            </div>
            ${t.version?`
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Version</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100">${t.version}</dd>
              </div>
            `:""}
            ${t.commit?`
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Commit</dt>
                <dd class="mt-1 text-sm font-mono text-gray-900 dark:text-gray-100">${t.commit}</dd>
              </div>
            `:""}
          </div>

          <!-- Timeline Section -->
          <div>
            <h5 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Deployment Timeline</h5>
            <div class="flow-root">
              <ul class="-mb-8">
                <li class="relative pb-8">
                  <div class="relative flex space-x-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <p class="text-sm text-gray-900 dark:text-gray-100">Deployment started</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${new Date(t.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="relative">
                  <div class="relative flex space-x-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full ${t.status==="success"?"bg-green-500":t.status==="failed"?"bg-red-500":"bg-yellow-500"}">
                      <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div>
                        <p class="text-sm text-gray-900 dark:text-gray-100">Deployment ${t.status}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${t.duration?`Completed in ${Math.floor(t.duration/60)}m ${t.duration%60}s`:"Status updated"}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `}renderPagination(){const t=Math.ceil(this.filteredDeployments.length/this.itemsPerPage),e=document.getElementById("pagination-nav"),i=document.getElementById("showing-from"),r=document.getElementById("showing-to"),s=document.getElementById("total-results");if(i&&r&&s){const n=(this.currentPage-1)*this.itemsPerPage+1,d=Math.min(this.currentPage*this.itemsPerPage,this.filteredDeployments.length);i.textContent=n.toString(),r.textContent=d.toString(),s.textContent=this.filteredDeployments.length.toString()}if(!e)return;let a="";a+=`
        <button ${this.currentPage===1?"disabled":""} 
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 ${this.currentPage===1?"cursor-not-allowed opacity-50":"cursor-pointer"} transition-colors duration-200"
                onclick="deploymentTable.goToPage(${this.currentPage-1})">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      `;for(let n=1;n<=t;n++)n===1||n===t||n>=this.currentPage-2&&n<=this.currentPage+2?a+=`
            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 ${n===this.currentPage?"bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400":""} transition-colors duration-200"
                    onclick="deploymentTable.goToPage(${n})">
              ${n}
            </button>
          `:(n===this.currentPage-3||n===this.currentPage+3)&&(a+=`
            <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
              ...
            </span>
          `);a+=`
        <button ${this.currentPage===t?"disabled":""} 
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 ${this.currentPage===t?"cursor-not-allowed opacity-50":"cursor-pointer"} transition-colors duration-200"
                onclick="deploymentTable.goToPage(${this.currentPage+1})">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      `,e.innerHTML=a}goToPage(t){const e=Math.ceil(this.filteredDeployments.length/this.itemsPerPage);t>=1&&t<=e&&(this.currentPage=t,this.renderTable(),this.renderPagination())}showLoading(){document.getElementById("loading-deployments")?.classList.remove("hidden")}hideLoading(){document.getElementById("loading-deployments")?.classList.add("hidden")}setupRealTimeUpdates(){o.subscribe("new-deployment",t=>{this.deployments.unshift(t),this.handleFilter(),this.showNotification("New deployment detected!")})}showNotification(t){const e=document.createElement("div");e.className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300",e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.classList.remove("translate-x-full")},100),setTimeout(()=>{e.classList.add("translate-x-full"),setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}}let l;document.addEventListener("DOMContentLoaded",()=>{l=new c,window.deploymentTable=l});
