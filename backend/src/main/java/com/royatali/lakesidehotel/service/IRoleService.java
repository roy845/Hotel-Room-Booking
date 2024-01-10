package com.royatali.lakesidehotel.service;

import com.royatali.lakesidehotel.model.Role;
import com.royatali.lakesidehotel.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role role);
    void deleteRole(Long id);
    Role findByName(String name);
    User removeUserFromRole(Long userId,Long roleId);
    User assignRoleToUser(Long userId,Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
