import { Component } from '@angular/core';
import { AppLayoutConfig } from '@shared';
import { DASHBOARD_ICON, INVENTORY_ICON, LEADS_ICON, MASTER_ICON, MEMBERS_ICON, TREE_ICON, USERS_ICON, EPIN_ICON, FINANCIAL_ICON, WALLET_ICON } from './menu-icons';
import { AuthService } from '@libs/shared/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  template: `<shared-app-layout [config]="layoutConfig" (signOut)="onSignOut()"></shared-app-layout>`,
})
export class AdminLayoutComponent {
  readonly layoutConfig: AppLayoutConfig = {
    appName: 'Admin Portal',
    brandName: 'Rudrakshama',
    appSubtitle: 'Administration Console',
    profileRoute: '/admin/change-password',
    changePasswordRoute: '/admin/change-password',

    user: {
      name: 'Admin User',
      role: 'Administrator',
      loginId: 'admin@rudrakshama.com',
    },
    notifications: [
      { id: 1, title: 'New member registration pending approval', time: '5m ago', read: false },
      { id: 2, title: 'Daily audit report generated', time: '30m ago', read: false },
      { id: 3, title: 'Role permissions updated', time: 'Yesterday', read: true },
    ],
    menu: [
      { label: 'Dashboard', route: '/admin/dashboard', section: 'MAIN', icon: DASHBOARD_ICON },
      // { label: 'Inventory', section: 'MAIN', icon: INVENTORY_ICON, subItems: [
      //   { name: 'All Inventory', path: '/admin/inventory/list' },
      //   { name: 'Add Inventory', path: '/admin/inventory/add-inventory' },
      // ]},
      // { label: 'Leads', section: 'MAIN', icon: LEADS_ICON, subItems: [
      //   { name: 'Dashboard', path: '/admin/leads' },
      //   { name: 'Add Lead', path: '/admin/leads/add' },
      // ]},
      { label: 'Network Manager', section: 'NETWORK', icon: TREE_ICON, subItems: [
        { name: 'Genealogy', path: '/admin/tree/genealogy' },
        // { name: 'Matching Tree', path: '/admin/tree/matching-tree' },
        // { name: 'Matrix Tree', path: '/admin/tree/matrix-tree' },
      ]},
      { label: 'Members', section: 'MANAGEMENT', icon: MEMBERS_ICON, subItems: [
        { name: 'List', path: '/admin/members/list' },
        { name: 'Sponsor New', path: '/admin/sponsor-new' },
      ]},
      { label: 'Master', section: 'MANAGEMENT', icon: MASTER_ICON, subItems: [
        { name: 'Country', path: '/admin/master/country' },
        { name: 'State', path: '/admin/master/state' },
        { name: 'District', path: '/admin/master/district' },
        { name: 'City', path: '/admin/master/city' },
      ]},
      { label: 'Recent Orders', section: 'MANAGEMENT', icon: EPIN_ICON, subItems: [
        { name: 'Recent Orders', path: '/admin/epin-manager/requested-list' },
      ]},
      { label: 'Financial Manager', section: 'MANAGEMENT', icon: FINANCIAL_ICON, subItems: [
        { name: 'Deposit in Account', path: '/admin/financial-manager/deposit-in-account' },
        { name: 'Debit from Account', path: '/admin/financial-manager/debit-from-account' },
      ]},
      { label: 'Currency Wallet', section: 'MANAGEMENT', icon: WALLET_ICON, subItems: [
        { name: 'E-Wallet', path: '/admin/currency-wallet/ewallet' },
        { name: 'Transaction History', path: '/admin/currency-wallet/transaction-history' },
      ]},
      { label: 'Users', route: '/admin/users', section: 'MANAGEMENT', icon: USERS_ICON },
    ],
  };

  constructor(private readonly authService: AuthService) {}

  onSignOut(): void {
    this.authService.logout().subscribe();
  }
}
